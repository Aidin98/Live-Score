const BaseModel = require("./BaseModel");

class Game extends BaseModel {
  constructor(model, user) {
    super(model, user);
    this.writeRights = "admin";
  }

  getAll() {
    return this.Model.find({});
  }



  getById(id) {
    return this.Model.findById(id);
  }

  create(data) {

    if (!this.user || this.user.role !== "admin") {
      throw new Error("You need to be admin user to create a game!");
    }

    data.added_by = this.user;
    return this.Model.create(data);
  }


  findAndDelete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }
}

module.exports = Game;
