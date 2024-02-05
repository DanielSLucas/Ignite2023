import { Notification } from '../../enterprise/entities/notification'

export interface NotificationsRepository {
  create(props: Notification): Promise<Notification>
  save(props: Notification): Promise<void>
  findById(id: string): Promise<Notification | null>
}
