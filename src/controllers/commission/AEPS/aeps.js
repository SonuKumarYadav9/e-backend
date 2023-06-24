import AEPSmodel from "../../../models/commissions/AEPScommission.js";

export const createAEPScommission = async (req, res) => {
  try {
    let { slab, type, APIClient, master, distributor, retailer } = req.body;

    // Create a new commission document
    const commission = new AEPSmodel({
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
    // console.log(error);
    res.status(500).json({
      status: false,
      message: "Failed to create commission.",
      msg: error.message,
    });
  }
};



export const updateAEPScommission = async (req, res) => {
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

    let _id = commissionId.toString();

    // Find the commission document by ID
    const commission = await AEPSmodel.findById({ _id });             //* It will Fetch the data  

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
