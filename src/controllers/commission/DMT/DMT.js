import DMTmodel from "../../../models/commissions/DMTcommission.js";


export const createDMTcommission = async (req, res) => {
    try {
      let { slab, type, APIClient, master, distributor, retailer } = req.body;
  
      // Create a new commission document
      const commission = new DMTmodel({
        slab,
        type,
        APIClient,
        master,
        distributor,
        retailer,
      });
  
      // Save the commission to the database
      const savedCommission = await commission.save();
  
      res.status(201).json({
        status: "success",
        message: "Commission created successfully.",
        data: savedCommission,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: "Failed to create commission.",
        error: error.message,
      });
    }
  };





export const updateDMTcommission = async (req, res) => {
    try {
      const {
        commissionId,
        slab,
        type,
        APIClient,
        master,
        distributor,
        retailer,
      } = req.body;
  

  
      // Find the commission document by ID
      const commission = await DMTmodel.findById(commissionId);             //* It will Fetch the data  
  
      console.log(commission)
      if (!commission) {
        return res.status(404).json({
          status: false,
          message: "Commission not found.",
        });
      }
  
      // Update the commission document with the updated values
      commission.slab = slab;
      commission.type = type;
      commission.APIClient = APIClient;
      commission.master = master;
      commission.distributor = distributor;
      commission.retailer = retailer;
  
      // Save the updated commission to the database
      const updatedCommission = await commission.save();
  
      res.status(200).json({
        status: "success",
        message: "Commission updated successfully.",
        data: updatedCommission,
      });
    } catch (error) {
      // console.log(error);
      res.status(500).json({
        status: false,
        message: "Failed to update commission.",
        msg: error.message,
      });
    }
  };
  






