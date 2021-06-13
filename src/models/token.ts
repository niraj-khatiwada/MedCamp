import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize'

import translation from '../translations'

// @ts-ignore
interface CustomInterface extends ModelCtor<Model<any, any>> {
  statusMapping: {
    [a: number]: string
  }
}

export function token(sequelize: Sequelize) {
  // @ts-ignore
  const Token: CustomInterface = sequelize.define('token', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data: {
      type: DataTypes.TEXT,
    },
    expiryDate: {
      type: DataTypes.DATE,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
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

  Token.statusMapping = {
    0: translation.Inactive,
    1: translation.Active,
  }
  return Token
}
