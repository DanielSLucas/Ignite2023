import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

describe('watched list', () => {
  it('should be able to create a watched list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3])

    expect(list.currentItems).toHaveLength(3)
  })

  it('should be able to add new items to the list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)

    expect(list.currentItems).toHaveLength(4)
    expect(list.getNewItems()).toEqual([4])
  })

  it('should be able to remove items from the list', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(2)

    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual([2])
  })

  it('should be able to add an item even if it was removed before', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.remove(2)
    list.add(2)

    expect(list.currentItems).toHaveLength(3)

    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  it('should be able to remove an item even if it was added before', () => {
    const list = new NumberWatchedList([1, 2, 3])

    list.add(4)
    list.remove(4)

    expect(list.currentItems).toHaveLength(3)

    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  // Ótimo exemplo de uso da watched list
  it('should be able to update watched list items', () => {
    // Dado que eu tenho uma lista com os números 1, 2 e 3
    const list = new NumberWatchedList([1, 2, 3])

    // Quando eu atualizo essa lista para 1, 3 e 5
    list.update([1, 3, 5])

    // Então eu espero que os items removidos seja o 2
    expect(list.getRemovedItems()).toEqual([2])
    // E então eu espero que os items adicionados seja o 5
    expect(list.getNewItems()).toEqual([5])

    // Dessa maneira, usando o pattern de watched list, conseguimos optimizar
    // as operações feitas no banco de dados. Ao invés de atualizar tudo que há no banco
    // removemos e adiconamos somente o que foi alterado
  })
})
