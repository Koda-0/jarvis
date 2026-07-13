const Service = require('../models/Service');

async function addService(req, res) {
  try {
    const { icon, serviceName, serviceDesc } = req.body;

    // validation
    if (!icon || !serviceName || !serviceDesc) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required (icon, serviceName, serviceDesc)',
      });
    }

    const service = await Service.create({
      icon,
      serviceName,
      serviceDesc,
    });

    return res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getServices(req,res){
    try{
    const services = await Service.find({});
    return res.status(200).json({
        success: true,
        message: 'List of Services',
        data: services
    })
    }
    catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateService(req, res) {
  try {
    const { id } = req.params;
    const { icon, serviceName, serviceDesc } = req.body;

    // Check if service exists
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Update fields only if provided
    service.icon = icon || service.icon;
    service.serviceName = serviceName || service.serviceName;
    service.serviceDesc = serviceDesc || service.serviceDesc;

    await service.save();

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteService(req,res){
  const id = req.params.id.trim();
  const service = await Service.findById(id);
  if(service){
   Service.deleteOne(service)
   return res.status(200).json({
    message:"Service Deleted Successfully"
   })
  }
  
  return res.status(404).json({
    message:"Service not found"
  })
}

module.exports = { addService, getServices, updateService, deleteService };