const Course = require('../models/Course');
const Category = require('../models/Category');

//kurs oluşturma
exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).redirect('/courses');
    //res.send('Yeni kurs oluşturuldu.');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

//kurs listeleme
exports.getAllCourses = async (req, res) => {
  try {
    //sıralamak için gerekli kategori filtresi
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }
    const courses = await Course.find(filter);
    const categories = await Category.find();

    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

//Tekil Kurs Sayfası
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    res.status(200).render('course', {
      course,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
