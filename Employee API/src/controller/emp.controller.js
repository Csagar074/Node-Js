
const Employee = require('../model/emp.model');

module.exports.addEmp = async (req, res) => {
    try {
        const newemp = await Employee.create(req.body);

      if(!newemp){
          return res.status(404).json({ msg: "Employee inserted Failted..." });
      }
      
        return res.status(201).json({ msg: "Employee inserted successfully..." });

    } catch (error) {
        return res.status(500).json({ msg: "Employee insert failed..."});
    }
};

module.exports.fatchAllEmp = async (req, res) => {
    try {
        const fatch = await Employee.find(req.body);

      if(!fatch){
          return res.status(201).json({ msg: "Employee Fetch Failted..." });
      }
      
      return res.status(400).json({ msg: "Employee Fetched successfully..." });

    } catch (error) {
        return res.status(500).json({ msg: "Employee Fetch  failed..."});
    }
};

module.exports.deleteEmp = async (req, res) => {
    try {
        console.log(req.query.id);
        const deleteEmployee = await Employee.findByIdAndDelete(req.query.id);

      if(!deleteEmployee){
          return res.status(404).json({ msg: "Employee Delete Failted..." });
      }
      
      return res.status(201).json({ msg: "Employee Delete successfully..." });

    } catch (error) {
        return res.status(500).json({ msg: "Employee Delete  failed..."});
    }
};

module.exports.updateEmp = async (req, res) => {
    try {
        console.log(req.params.id);
        const updateEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new:true});

      if(!updateEmployee){
          return res.status(404).json({ msg: "Employee Update Failted..." });
      }

      return res.status(201).json({ msg: "Employee Update successfully..." });

    } catch (error) {
        return res.status(500).json({ msg: "Employee Update  failed..."});
    }
};
