import { Model, ModelCtor, Transaction } from 'sequelize'

export class CoreModel {
  constructor(public table: ModelCtor<Model<any, any>>) {
    this.table = table
  }

  findAllActive() {
    return this.table.findAll({
      where: {
        status: 1,
      },
    })
  }

  findAllInActive() {
    return this.table.findAll({
      where: {
        status: 0,
      },
    })
  }

  delete(id: number, transaction?: Transaction) {
    return this.table.update(
      {
        status: 0,
      },
      {
        where: {
          id,
        },
        transaction,
      }
    )
  }

  realDelete(id: number, transaction?: Transaction) {
    return this.table.destroy({
      where: {
        id,
      },
      transaction,
    })
  }
}
