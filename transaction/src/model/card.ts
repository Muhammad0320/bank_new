import {
  CardNetwork,
  CardStatus,
  CardType,
  Info,
  Settings,
  User
} from '@m0banking/common';
import mongoose from 'mongoose';
import { AccountDoc } from './account';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

type CardTxnAttrs = {
  no: string;
  cvv: string;
  expYear: number;
  cardName: string;
  expMonth: number;

  billingAddress: string;
};

type CardAttrs = {
  id: string;
  account: string;
  user: User;
  settings: Settings;
  info: Info;
  version: number;
};


type CardDoc = mongoose.Document & CardAttrs & { account: AccountDoc } ;

type CardModel = mongoose.Model<CardDoc> & {
  findByLastVersionAndId(id: string, version: number): Promise<CardDoc | null>;
  buildCard(attrs: CardAttrs): Promise<CardDoc>;
};

const cardSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },

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
      enum: Object.values(CardNetwork)
    },

    cardType: {
      type: String,
      enum: Object.values(CardType)
    },

    cvv: String,
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
      maxlength: 400,
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

cardSchema.methods.validateTxn = async function(attrs: CardTxnAttrs) {
  // const {card: decryptedCard, cvv: decryptedCvv} = decrypt(no, cvv)
};

cardSchema.statics.buildCard = async function(attrs: CardAttrs) {
                                                                  const card = await Card.create(
                                                                    {
                                                                      _id:
                                                                        attrs.id,
                                                                      ...attrs
                                                                    }
                                                                  );

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
