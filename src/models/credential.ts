import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize'

import translation from '../translations'

// @ts-ignore
interface CustomInterface extends ModelCtor<Model<any, any>> {
  typeMapping: {
    [a: number]: string
  }
  verifiedMapping: {
    [a: number]: string
  }
  twoFactorAuthenticationMapping: {
    [a: number]: string
  }
  forceChangePasswordMapping: {
    [a: number]: string
  }
  statusMapping: {
    [a: number]: string
  }
  associate: (models: Model[]) => void
}

export function credential(sequelize: Sequelize) {
  // @ts-ignore
  const Credential: CustomInterface = sequelize.define('credential', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: translation.invalidEmail,
        },
      },
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.NUMBER,
      validate: {
        len: {
          args: [10, 10],
          msg: translation.PhoneNumberShouldBeTenDigitsLong,
        },
      },
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        is: {
          args: /[1|2|3]/i,
          msg: translation['CredentialTypeShouldBeWithin...'],
        },
      },
    },
    verified: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        is: {
          args: /[0|1]/i,
          msg: translation['CredentialVerifiedShouldBeWithin...'],
        },
      },
    },
    twoFactorAuthentication: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        is: {
          args: /[0|1]/i,
          msg: translation['TwoFactorAuthenticationShouldBeWithin...'],
        },
      },
    },

    forceChangePassword: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        is: {
          args: /[0|1]/i,
          msg: translation['TwoFactorAuthenticationShouldBeWithin...'],
        },
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

  Credential.associate = (models) => {
    // @ts-ignore
    Credential.hasOne(models.User)
  }

  Credential.typeMapping = {
    1: translation.Normal,
    2: translation.Google,
    3: translation.Apple,
  }
  Credential.verifiedMapping = {
    0: translation.NotVerified,
    1: translation.Verified,
  }
  Credential.twoFactorAuthenticationMapping = {
    0: translation.Disabled,
    1: translation.Enabled,
  }
  Credential.forceChangePasswordMapping = {
    0: translation.Disabled,
    1: translation.Enabled,
  }
  Credential.statusMapping = {
    0: translation.Inactive,
    1: translation.Active,
  }

  return Credential
}
