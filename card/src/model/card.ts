import {
  CardNetwork,
  CardStatus,
  CardType,
  CryptoManager,
  Info,
  Settings,
  User
} from '@m0banking/common';
import mongoose from 'mongoose';
import { AccountDoc } from './Account';
import { generateCardNumber } from '../services/crypto';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { DateFxns } from '../services/helper';

type CardTxnAttrs = {
  no: string;
  cvv: string;
  expYear: number;
  cardName: string;
  expMonth: number;

  billingAddress: string;
};



type CardAttrs = {

  account: AccountDoc;
  user: User;

  billingAddress: string;
  networkType: CardNetwork;
  type: CardType;

};

type CardDoc = mongoose.Document & CardAttrs & { version: number;   account: AccountDoc;
  user: User;

info: Info };

type CardModel = mongoose.Model<CardDoc> & {
  findByLastVersionAndId(id: string, version: number): Promise<CardDoc | null>;
  buildCard(attrs: CardAttrs): Promise<CardDoc>;
};

const cardSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },

  user: {
    id: String,
    name: String
  },

  settings: {
    dailyLimit: {
      type: Number,
      default: 500
    },
    weeklyLimit: {
      type: Number,
      default: 500
    },
    monthlyLimit: {
      type: Number,
      default: 5000
    }
  },

  info: {
    no: {
      type: String,
      required: true,
      unique: true
    },

    network: {
      type: String,
      enum: Object.values(CardNetwork),
      default: CardNetwork.Visa
    },

    cardType: {
      type: String,
      enum: Object.values(CardType),
      default: CardType.Debit
    },

    cvv: {
      type: String,
      required: true,
      unique: true
    },
    expiryDate: {
      type: Date
    },
    issueDate: {
      type: Date,
      default: new Date()
    },
    billingAddress: {
      type: String,
      required: true,
      maxlength: 200,
      minlength: 20
    },

    maxCredit: {
      type: Number
    },

    status: {
      type: String,
      enum: Object.values(CardStatus),
      default: CardStatus.Inactive
    }
  }
});

cardSchema.set('versionKey', 'version');
cardSchema.plugin(updateIfCurrentPlugin);

cardSchema.pre('save', async function(next) {
  if (this.isModified() && this.info?.cardType === CardType.Debit) {
    this.info!.maxCredit = undefined;
  } else {
    this.info!.maxCredit = 50;
  }

  next();
});

cardSchema.pre('save', async function(next) {
  if (this.isModified()) {
    const { mm, yy } = DateFxns();

    const cardNumber = generateCardNumber();
    const cvv = generateCardNumber();

    this.info!.expiryDate = new Date(yy, mm);
    this.info!.no = (await CryptoManager.hash(cardNumber)) as string;
    this.info!.cvv = (await CryptoManager.hash(cvv)) as string;
  }

  if (this.isNew) {
    console.log('This is a new copy of card document');
  }

  next();
});

cardSchema.methods.validateTxn = async function(attrs: CardTxnAttrs) {
  // const {card: decryptedCard, cvv: decryptedCvv} = decrypt(no, cvv)
};

cardSchema.statics.buildCard = async function(attrs: CardAttrs) {
  const cardObject = {
    account: attrs.account,
    user: attrs.user,
    info: {
      billingAddress: attrs.billingAddress,
      networkType: attrs.networkType,
      cardType: attrs.type
    }
  };

  const card = await Card.create(cardObject);

  return card;
};


cardSchema.statics.findByLastVersionAndId = async function(
  id: string,
  version: number
) {
  const __v = version - 1;

  return await Card.findOne({ _id: id, version: __v });
};

const Card = mongoose.model<CardDoc, CardModel>('Card', cardSchema);

export { Card };

