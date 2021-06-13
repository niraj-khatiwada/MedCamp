import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize'

import translation from '../translations'

// @ts-ignore
interface CustomInterface extends ModelCtor<Model<any, any>> {
  genderMapping: {
    [a: number]: string
  }
  statusMapping: {
    [a: number]: string
  }
}

export function user(sequelize: Sequelize) {
  // @ts-ignore
  const User: CustomInterface = sequelize.define('user', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 100],
          msg: translation['FirstNameShouldBeAtLeast...'],
        },
      },
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2, 100],
          msg: translation['LastNameShouldBeAtLeast...'],
        },
      },
      allowNull: false,
    },
    gender: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        is: {
          args: /[1|2|3]/i,
          msg: translation['GenderShouldBeWithin...'],
        },
      },
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        is: {
          args: /[0|1|2]/i,
          msg: `${translation['StatusShouldBeWithin...']} 0,1,2`,
        },
      },
    },
  })

  User.genderMapping = {
    1: translation.Male,
    2: translation.Female,
    3: translation.Others,
  }
  User.statusMapping = {
    0: translation.Inactive,
    1: translation.Active,
    2: translation.Suspended,
  }
  return User
}
