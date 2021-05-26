const BaseModel = require("./BaseModel");

class User extends BaseModel {
  constructor(model, user) {
    super(model, user);
  }

  getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      return ctx.getUser();
    }

    return null;
  }
  getAll() {
    return this.Model.find({});
  }

  async signUp(signUpData) {
    try {
      return await this.Model.create(signUpData);
    } catch (e) {
      if (e.code && e.code === 11000) {
        throw new Error("User with provided email already exists!");
      }

      throw e;
    }
  }

  async signIn(signInData, ctx) {
    try {
      const user = await ctx.authenticate(signInData);
      return user;
    } catch (error) {
      return error;
    }
  }

  signOut(ctx) {
    try {
      ctx.logout();
      return true;
    } catch (e) {
      return false;
    }
  }
  findAndUpdate(id, data) {
     if (!this.user || this.user.role !== "admin") {
       throw new Error("You need to be admin user to edit a user!");
     }

    return this.Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
  }
  findAndDelete(id) {
     if (!this.user || this.user.role !== "admin") {
       throw new Error("You need to be admin user to delete a user!");
     }
    return this.Model.findOneAndRemove({ _id: id });
  }
}

module.exports = User;
