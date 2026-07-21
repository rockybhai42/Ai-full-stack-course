import Player from "../models/Player.js";


// CREATE PLAYER
export const createPlayer = async (req, res) => {
  try {

    const {
      playerName,
      runs,
      strikeRate,
      internationalStatus
    } = req.body;


    const player = await Player.create({

      playerName,
      runs,
      strikeRate,
      internationalStatus,

      // logged in user's id
      ownerId: req.user.id

    });


    res.status(201).json({

      success: true,
      message: "Player created successfully",
      player

    });


  } catch (error) {

    res.status(500).json({

      success:false,
      message:error.message

    });

  }
};




// GET ALL USER PLAYERS
export const getPlayers = async (req, res) => {

  try {


    const players = await Player.find({

      ownerId:req.user.id

    });


    res.status(200).json({

      success:true,
      count:players.length,
      players

    });


  } catch(error){

    res.status(500).json({

      success:false,
      message:error.message

    });

  }

};




// GET SINGLE PLAYER
export const getPlayer = async (req,res)=>{

  try{


    const player = await Player.findOne({

      _id:req.params.id,

      ownerId:req.user.id

    });



    if(!player){

      return res.status(404).json({

        success:false,
        message:"Player not found"

      });

    }



    res.status(200).json({

      success:true,
      player

    });



  }catch(error){

    res.status(500).json({

      success:false,
      message:error.message

    });

  }

};




// UPDATE PLAYER
export const updatePlayer = async(req,res)=>{

  try{


    const player = await Player.findOneAndUpdate(

      {
        _id:req.params.id,

        ownerId:req.user.id
      },


      req.body,


      {
        new:true,
        runValidators:true
      }


    );



    if(!player){

      return res.status(404).json({

        success:false,

        message:"Player not found or unauthorized"

      });

    }



    res.status(200).json({

      success:true,

      message:"Player updated successfully",

      player

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};




// DELETE PLAYER
export const deletePlayer = async(req,res)=>{


  try{


    const player = await Player.findOneAndDelete({

      _id:req.params.id,

      ownerId:req.user.id

    });



    if(!player){

      return res.status(404).json({

        success:false,

        message:"Player not found or unauthorized"

      });

    }



    res.status(200).json({

      success:true,

      message:"Player deleted successfully"

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};