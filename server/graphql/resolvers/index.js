exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx);
  },
  users:(root,args,ctx)=>{
      return ctx.models.User.getAll()
  }
};

exports.userMutations = {
  signUp: async (root, { input }, ctx) => {
    const registeredUser = await ctx.models.User.signUp(input);
    return registeredUser._id;
  },
  signIn: (root, { input }, ctx) => {
    return ctx.models.User.signIn(input, ctx);
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  },
  updateUser:async(root,{id,input},ctx)=>{
    const updatedUser=await ctx.models.User.findAndUpdate(id,input)
    return updatedUser;
  },
  deleteUser:async(root,{id},ctx)=>{
    const deletedUser=await ctx.models.User.findAndDelete(id)
    return deletedUser._id
  }
};

//game queries and mutatuins starts
exports.gameQueries = {
  games: (root, args, ctx) => {
    return ctx.models.Game.getAll();
  },
  gameById: async (root, { id }, ctx) => {
    const game = await ctx.models.Game.getById(id);
    return game;
  },
  eventsByGameId: async (root, { id }, ctx) => {
    return ctx.models.Event.getAllByGameId(id);
  },
};
exports.gameMutatuions={
  createGame:async (root,{input},ctx)=>{
    const createdGame=await ctx.models.Game.create(input)
    return createdGame
  },
  createGameEvent:async(root,{id,input},ctx)=>{
     input.game_id=id;
    const event=await ctx.models.Event.create(input)
    return event;
  },
  updateEvent:async(root,{id,input},ctx)=>{
    const updatedEvent = await ctx.models.Event.findAndUpdate(id,input);
    return updatedEvent;
  }
}


//game queries and mutatuins ends

