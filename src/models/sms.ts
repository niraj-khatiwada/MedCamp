import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize'

import translation from '../translations'

// @ts-ignore
interface CustomInterface extends ModelCtor<Model<any, any>> {
  statusMapping: {
    [a: number]: string
  }
}

export function sms(sequelize: Sequelize) {
  // @ts-ignore
  const SMS: CustomInterface = sequelize.define('sms', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 100],
          msg: `${translation.SMS} ${translation['SlugShouldBeWithin...']}`,
        },
      },
      allowNull: false,
    },
    subject: DataTypes.TEXT,
    body: DataTypes.TEXT,
    tags: {
      type: DataTypes.STRING,
      validate: {
        isArray: {
          args: false,
          msg: translation.EmailTagsShouldBeAnArrayOfStrings,
        },
      },
      get() {
        return this.getDataValue('tags')?.split(',')
      },
      set(value: string[]) {
        this.setDataValue('tags', value.join(','))
      },
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

  SMS.statusMapping = {
    0: translation.Inactive,
    1: translation.Active,
  }
  return SMS
}
