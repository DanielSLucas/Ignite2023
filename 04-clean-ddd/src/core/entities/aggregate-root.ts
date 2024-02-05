import { DomainEvent } from '../events/domain-event'
import { DomainEvents } from '../events/domain-events'
import { Entity } from './entity'

/*
 * Aggregate -> Entidade que se relaciona fortemente com outras entidades,
 * de forma que, as entidades relacionadas com a entidade agregada raiz (AggregateRoot),
 * só tem sentido se existirem juntas.
 *
 * Exemplo: Um pedido e os itens do pedido (não faz sentido os itens do pedido
 * existirem sem o pedido). Ou então no nosso contexto de forum, os anexos de
 * uma pegunta.
 */

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
