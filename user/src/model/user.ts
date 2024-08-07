import mongoose from 'mongoose';

import { CryptoManager, UserRole, UserStatus } from '@m0banking/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

type UserUpdatesObj = {
  timeStamp: Date;

  old: string;

  new: string;

  updatedField: string;
};

type UserAttrs = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role?: UserRole;
  phone: number;
  username: string;
};

type UserDoc = mongoose.Document &
UserAttrs & {
  version: number;
  createdAt: Date;
  status: UserStatus;
  avatar: string;
    signinTimeStamps: Date[];

    updates: UserUpdatesObj[];
  };

type UserModel = mongoose.Model<UserDoc> & {
  buildUser: (attrs: UserAttrs) => Promise<UserDoc>;
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'This field is required.'],
      minlength: [4, 'Name should be at least 4 chars.']
    },

    email: {
      type: String,
      unique: true,
      required: [true, 'This field is required.']
    },

    username: {
      type: String,
      unique: true,
      required: true
    },

    password: {
      type: String,
      required: [true, 'This field is required.'],
      select: false
    },

    passwordConfirm: {
      type: String,
      validate: {
        validator: function(this: UserDoc, value: string): boolean {
          return this.password === value;
        },

        message: 'Passwords are not the same'
      }
    },

    avatar: {
      type: String
    },

    role: {
      type: String,
      default: UserRole.User,
      enum: Object.values(UserRole)
    },

    status: {
      type: String,

      enum: Object.values(UserStatus),

      default: UserStatus.Active
    },

    phone: {
      type: Number,
      required: true
    },

    createdAt: {
      type: Date,
      default: new Date()
    },

    signinTimeStamps: [
      {
        type: Date
      }
    ],

    updates: [
      {
        updatedField: {
          type: String
        },

        old: {
          type: String
        },

        new: {
          type: String
        },

        timeStamp: {
          type: Date
        }
      }
    ]
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id; //
      }
    }
  }
);

userSchema.set('versionKey', 'version');
userSchema.plugin(updateIfCurrentPlugin);

userSchema.statics.buildUser = async (attrs: UserAttrs) => {
  return await User.create(attrs);
};

userSchema.pre('save', async function(next) {
  if (this.isModified()) {
    this.password = (await CryptoManager.hash(this.password)) as string;

    this.passwordConfirm = undefined;
  }

  next();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export default User;

