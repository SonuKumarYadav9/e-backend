import NSDLpanModel from "../../../models/commissions/NSDLpanCardCommission.js";

export const createNSDLpanCommission = async (req, res) => {
  try {
    let data = req.body;

    const { slab, type, APIClient, master, distributor, retailer } = data;
    if (!slab || !type || !APIClient || !master || !distributor || !retailer) {
      return res
        .status(404)
        .send({ status: false, msg: "All field Are required" });
    }
    let savedData = await NSDLpanModel.create(data);
    return res
      .status(201)
      .send({ status: true, msg: "success", data: savedData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Failed to update commission.",
      msg: error.message,
    });
  }
};

export const updateNSDLcommission = async (req, res) => {
  try {
    let data = req.body;
    let { slab, type, APIClient, master, distributor, retailer, commissionId } =
      data;

    let user = await NSDLpanModel.findById(commissionId);

    if (user) {
      let updatedData = {};

      if (slab) {
        updatedData.slab = slab;
      }

      if (type) {
        updatedData.type = type;
      }

      if (APIClient) {
        updatedData.APIClient = APIClient;
      }

      if (master) {
        updatedData.master = master;
      }

      if (distributor) {
        updatedData.distributor = distributor;
      }

      if (retailer) {
        updatedData.retailer = retailer;
      }

      const updated = await NSDLpanModel.findByIdAndUpdate(
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
