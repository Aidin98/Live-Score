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
exports.gameQueries={
  games:(root,args,ctx)=>{
    return ctx.models.Game.getAll()
  }
}
exports.gameMutatuions={
  createGame:async (root,{input},ctx)=>{
    const createdGame=await ctx.models.Game.create(input)
    return createdGame
  }
}


//game queries and mutatuins ends
