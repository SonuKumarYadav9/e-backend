import payoutModel from "../../../models/commissions/payoutCommission.js";


export const createPayoutCommission = async (req, res) => {
    try {
      let { slab, type, API, retailer } = req.body;
  
      // Create a new commission document
      const commission = new payoutModel({
        slab,
        type,
        API,
        retailer,
      });
  
      // Save the commission to the database
      const savedCommission = await commission.save();
      console.log(savedCommission)
  
      res.status(201).json({
        status: "success",
        message: "Commission created successfully.",
        data: savedCommission,
      });
    } catch (error) {
      // console.log(error);
      res.status(500).json({
        status: false,
        message: "Failed to create commission.",
        msg: error.message,
      });
    }
  };
  
  
  export const updatePayoutCommission = async (req, res) => {
    try {
      let data = req.body;
      let { slab, type, API, retailer, commissionId } = data;
  
      let user = await payoutModel.findById(commissionId);
  
      if (user) {
        let updatedData = {};
  
        if (slab) {
          updatedData.slab = slab;
        }
  
        if (type) {
          updatedData.type = type;
        }
  
        if (API) {
          updatedData.API = API;
        }
  
       
        if (retailer) {
          updatedData.retailer = retailer;
        }

        const updated = await payoutModel.findByIdAndUpdate(
          user._id,
          updatedData,
          { new: true }
        );
        return res
          .status(200)
          .send({ status: true, msg: "success", data: updated });
      }
  
      return res
        .status(404)
        .send({ status: false, msg: "Commission not found." });
  
        
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Failed to update commission.",
        msg: error.message,
      });
    }
  };
