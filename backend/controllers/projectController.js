import { v2 as cloudinary } from 'cloudinary'
import projectModel from '../models/projectModel.js';

const addProject = async ( req, res ) => {
  try {

    const { project_name, customer_name, customer_email, customer_phone, description, notes, amount_paid, duedate, userId } = req.body;

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]
    const image5 = req.files.image5 && req.files.image5[0]

    // Filtering out undefined images
    const images = [image1, image2, image3, image4, image5].filter((item) => item !== undefined)

    let imagesUrl = await Promise.all(
      images.map( async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
        return result.secure_url
      })
    )

    const projectData = {
      userId,
      project_name,
      customer_name,
      customer_email,
      customer_phone,
      description,
      notes: JSON.parse(notes),
      amount_paid: Number(amount_paid),
      paid: false,
      date: Date.now(),
      duedate: Date.parse(duedate),
      images: imagesUrl
    }

    console.log(projectData)

    const project = new projectModel(projectData)
    await project.save()

    res.json({success: true, message: "Project added!"})
    
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message})
  }
}

const getProjects = async ( req, res ) => {
  const { userId } = req.body;

  try {
    const projectsData = await projectModel.find({ userId: userId });

    if (projectsData.length === 0) {
      return res.json({ success: false, message: "No projects found for this user." });
    }

    res.json({ success: true, projectsData})
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message})
  }
}

const getSingleProject = async ( req, res ) => {
  const { userId, projectId } = req.body;

  try {
    const project = await projectModel.findOne({_id: projectId, userId: userId});
    res.json({ success: true, project})
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message})
  }
}

const markComplete = async ( req, res ) => {
  try {
    await projectModel.findByIdAndUpdate(req.body.projectId, {complete: true});
    res.json({ success: true, message: "Project marked complete"})
  } catch( error ) {
    console.log(error)
    res.json({ success: false, message: error.message})
  }
}

export { addProject, getProjects, getSingleProject, markComplete }