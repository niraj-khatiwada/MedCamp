import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize'

import translation from '../translations'

// @ts-ignore
interface CustomInterface extends ModelCtor<Model<any, any>> {
  statusMapping: {
    [a: number]: string
  }
}

export function image(sequelize: Sequelize) {
  // @ts-ignore
  const Image: CustomInterface = sequelize.define('image', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
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

  Image.statusMapping = {
    0: translation.Inactive,
    1: translation.Active,
  }
  return Image
}
