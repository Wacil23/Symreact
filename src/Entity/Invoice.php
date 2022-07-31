<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\InvoiceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: InvoiceRepository::class)]
#[ApiResource(
    itemOperations: [
        'GET', 
        'PUT', 
        'DELETE', 
        'increment' => 
        [
            'method' => 'post', 
            'path' => '/invoices/{id}/increment', 
            'controller' => 'App\Controller\InvoiceIncrementationController',
            'openapi_context' => [
                'summary' => 'Incrémente une facture',
            ],
        ],
    ],
    attributes: [
        'pagination_enabled' => false,
        'pagination_items_per_page' => 10,
        'order' => ['sentAt' => 'desc'],
    ],
    normalizationContext: ['groups' => ['invoices_read']],
    denormalizationContext: [
        'disable_type_enforcement' => true
    ],

    subresourceOperations: [
        'api_customers_invoices_get_subresource' => ['normalization_context' => ['groups' => 'invoices_subresource']]
    ],

)
]
#[ApiFilter(OrderFilter::class, properties:['amount', 'sentAt'])]

class Invoice
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column()]
    #[Groups(['invoices_read', 'customers_read', 'invoices_subresource'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read', 'invoices_subresource'])]
    #[Assert\NotBlank(message: "Le montant de la facture est obligatoir")]
    #[Assert\Type(type: "numeric", message: "Le montant du customer est numeric")]
    private $amount = null;

    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read', 'invoices_subresource'])]
    #[Assert\Date(message: "La date doit être au format yyyy-mm-dd")]
    #[Assert\NotBlank(message: "La date d'envoie doit etre renseigner")]
    private $sentAt = null;

    #[ORM\Column(length: 255)]
    #[Groups(['invoices_read', 'customers_read', 'invoices_subresource'])]
    #[Assert\NotBlank(message: "Le status doit etre définie")]
    #[Assert\Choice(choices: ['PAID', 'CANCELLED', 'SENT'], message: "Le choix doit etre paid cancelled ou sent")]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'invoices')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['invoices_read'])]
    #[Assert\NotBlank(message: "Le client de la facture est obligatoir")]
    private ?Customer $customer = null;

    #[ORM\Column]
    #[Groups(['invoices_read', 'customers_read', 'invoices_subresource'])]
    #[Assert\NotBlank(message: "Le chrono de la facture est obligatoire")]
    #[Assert\Type(type: 'integer', message: "Le chrono doit etre un nombre")]
    private ?int $chrono = null;

    #[Groups(['invoices_read', 'invoices_subresource'])]
    public function getUser(): User {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(float $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getSentAt()
    {

        return $this->sentAt;
    }

    public function setSentAt($sentAt): self
    {
            $this->sentAt = $sentAt;
            return $this;
        

    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono(int $chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
