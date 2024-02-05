import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  get id() {
    return this._id
  }

  // 'protected' só pode ser chamado pela classe pai, ou pelas classes que herdam
  protected constructor(props: Props, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID()
    this.props = props
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true
    }

    if (entity.id === this._id) {
      return true
    }

    return false
  }
}
