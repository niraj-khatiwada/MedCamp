import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize'

import translation from '../translations'

// @ts-ignore
interface CustomInterface extends ModelCtor<Model<any, any>> {
  statusMapping: {
    [a: number]: string
  }
}

export function role(sequelize: Sequelize) {
  // @ts-ignore
  const Role: CustomInterface = sequelize.define('role', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        is: {
          args: /[0|1]/i,
          msg: `${translation['StatusShouldBeWithin...']} 0,1`,
        },
      },
    },
  })

  Role.statusMapping = {
    0: translation.Inactive,
    1: translation.Active,
  }
  return Role
}
