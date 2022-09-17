const mongoose = require("mongoose");
const FavoriteQuote = require("../models/Favorites.model");

//USER CREATES FAVORITE QUOTE
  //(one user can have many favorite quotes if the quote has a different quote id)
exports.createFavoriteQuote = async (req,res,next) =>{
    try{
      //find current users favoriteQuotes
      const myList = await FavoriteQuote.findOne({_owner:req.user._id})
      //verify if this quote id already exists
      if(myList){
        //if it is True that it exists
        const myListObject = myList.toObject()
                    /////here we use "find", later on to delete we will use "replace"
        const favorite = myListObject.favoritesList.find(item=>
          { return Number(item.id)===Number(req.body.id)})
            //if it exists
            if(favorite){return res.status(201).json({successMessage:"You already have this quote in your Favorite Quotes"})}
            else {
            //if it doesn't exists, we push it
            const updateFavorite = await FavoriteQuote.findOneAndUpdate({_owner:req.user._id},{$push:{favoritesList: {...req.body}}}, {new:true})
            return res.status(201).json({successMessage:"Added quote to Favorite Quotes", favorite:updateFavorite})}
        //and if this user does not have a favoritesList, we create it
        } else {
        const favorite= await FavoriteQuote.create({favoritesList:[req.body], _owner:req.user._id})
        res.status(201).json({ favorite });
      }
  
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        return res.status(400).json({ errorMessage: error.message });
  
      if (error.code === 11000)
        return res
          .status(400)
          .json({ errorMessage: "Something happened while working with quotes" });
  
      return res.status(500).json({ errorMessage: error.message });
    }
  }

//GET FAVORITE QUOTES LIST by USER
  exports.getFavoriteQuotes = async (req,res,next) =>{
    try{
        const favorite= await FavoriteQuote.findOne({_owner:req.user._id})
        res.status(201).json({ favorite});
  
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError)
        return res.status(400).json({ errorMessage: error.message });
  
      if (error.code === 11000)
        return res
          .status(400)
          .json({ errorMessage: "Something happened while getting your favorite quotes list" });
  
      return res.status(500).json({ errorMessage: error.message });
    }
  }

 