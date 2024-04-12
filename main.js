var courseName = document.getElementById('courseName');
var courseCategory = document.getElementById('courseCategory');
var coursePrice = document.getElementById('coursePrice');
var courseDescription = document.getElementById('courseDescription');
var courseCapacity = document.getElementById('courseCapacity');
var data = document.getElementById('data');
var click = document.getElementById('click');
var search = document.getElementById('search');
var update = document.getElementById('update');
var cuurentIndex = 0;
var isNameVaild = false;
var isCategoryVaild = false;
var isPriceVaild = false;
var isDescriptionVaild = false;
var isCapacityVaild = false;
update.style.cssText = 'display:none;';
var courses;

if (JSON.parse(localStorage.getItem('courses') == null)) {
  courses = [];
}
else {
  courses = JSON.parse(localStorage.getItem('courses'));
}
checkInput();
displayData();
function checkInput() {
  if (isNameVaild && isCategoryVaild && isPriceVaild && isDescriptionVaild && isCapacityVaild) {
    click.removeAttribute('disabled');
  }
  else {
    click.setAttribute('disabled', 'disabled');
  }
}

//create course 
click.onclick = function (e) {
  e.preventDefault();
  addCourse();
  resetInput();
  displayData();
  courseName.classList.remove('is-valid');
  courseCategory.classList.remove('is-valid');
  coursePrice.classList.remove('is-valid');
  courseDescription.classList.remove('is-valid');
  courseCapacity.classList.remove('is-valid');
}
//desplay data 
function displayData() {
  var result = '';
  for (var i = 0; i < courses.length; i++) {
    result += `
  <tr>
  <td>${i + 1}</td>
  <td>${courses[i].courseName}</td>
  <td>${courses[i].courseCategory}</td>
  <td>${courses[i].coursePrice}</td>
  <td>${courses[i].courseDescription}</td>
  <td>${courses[i].courseCapacity}</td>
  <td><button class="btn btn-info" onclick=getCourse(${i})>update</button></td>
  <td><button class="btn btn-danger" onclick=deleteCourse(${i})>delete</button></td>
</tr>
  `
  }
  data.innerHTML = result;
}
//creat course 
function addCourse() {
  var course = {
    courseName: courseName.value,
    courseCategory: courseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value
  };
  courses.push(course);
  localStorage.setItem('courses', JSON.stringify(courses));

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'course added successfully',
    showConfirmButton: false,
    timer: 1500
  })
}
//resetInput
function resetInput() {
  courseName.value = '';
  courseCategory.value = '';
  coursePrice.value = '';
  courseDescription.value = '';
  courseCapacity.value = '';
}
//delet All
document.getElementById('deleteBtn').onclick = function () {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete courses!'
  }).then((result) => {
    if (result.isConfirmed) {
      courses = [];
      data.innerHTML = '';
      localStorage.setItem('courses', JSON.stringify(courses));
      Swal.fire(
        'Deleted!',
        'Your courses has been deleted.',
        'success'
      )
    }
  })
}
//delete course
function deleteCourse(index) {
  Swal.fire({
    title: 'Are you sure to?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete course!'
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index, 1);
      localStorage.setItem('courses', JSON.stringify(courses));
      displayData();
      Swal.fire(
        'Deleted!',
        'Your course has been deleted.',
        'success'
      )
    }
  })
}
//onkeypress
//onkeydown
//onkeyup
// search.onkeyup=function(){ //ما بتحسب الفراغ وطول ما انا كابسة ما بتعد   
//   console.log('test')
// }
// search.onkeydown=function(){     //     بتحسب الفراغ وطول ما انا كابسة بتضل تعد 
//   console.log('test')
// }
// search.onkeypress=function(){     //  بتحسب الفراغ وطول ما انا كابسة بتضل تعد  وبتختلف عن الdown في كبسات ما بتعدهم متل ال ctrl
//   console.log('test')
// }
search.onkeyup = function () {
  var result = '';
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())) {
      result += `
      <tr>
      <td>${i + 1}</td>
      <td>${courses[i].courseName}</td>
      <td>${courses[i].courseCategory}</td>
      <td>${courses[i].coursePrice}</td>
      <td>${courses[i].courseDescription}</td>
      <td>${courses[i].courseCapacity}</td>
      <td><button class="btn btn-info" onclick=getCourse(${i})>update</button></td>
      <td><button class="btn btn-danger" onclick=deleteCourse(${i})>delete</button></td>
    </tr>
      `
    }
    data.innerHTML = result;
  }
}

function getCourse(index) {
  cuurentIndex = index;
  var course = courses[index];
  courseName.value = course.courseName;
  courseCategory.value = course.courseCategory;
  coursePrice.value = course.coursePrice;
  courseDescription.value = course.courseDescription;
  courseCapacity.value = course.courseCapacity;
  update.classList.replace('d-none', 'd-inline');
  click.classList.add('d-none');
}
//updateCourse
update.onclick = function (e) {
  e.preventDefault();
  updateCourse();
  displayData();
  resetInput();
  click.classList.replace('d-none', 'd-inline');
  update.classList.replace('d-inline', 'd-none');
}
function updateCourse() {
  var course = {
    courseName: courseName.value,
    courseCategory: courseCategory.value,
    coursePrice: coursePrice.value,
    courseDescription: courseDescription.value,
    courseCapacity: courseCapacity.value
  };
  var previousName = courses[cuurentIndex].courseName;
  courses[cuurentIndex].courseName = course.courseName;
  courses[cuurentIndex].courseCategory = course.courseCategory;
  courses[cuurentIndex].coursePrice = course.coursePrice;
  courses[cuurentIndex].courseDescription = course.courseDescription;
  courses[cuurentIndex].courseCapacity = course.courseCapacity;
  localStorage.setItem('courses', JSON.stringify(courses));
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${previousName} update successfully`,
    showConfirmButton: false,
    timer: 1500
  })
}

var nameAlert = document.getElementById('nameAlert');
var categoryAlert = document.getElementById('categoryAlert');
var priceAlert = document.getElementById('priceAlert');
var descriptionAlert = document.getElementById('descriptionAlert');
var capacityAlert = document.getElementById('capacityAlert');
/*name start capital 
[3-10]
no numbers */
courseName.onkeyup = function () {
  var patern = /^[A-Z][a-z]{2,9}$/
  if (patern.test(courseName.value)) {
    isNameVaild = true;
    nameAlert.classList.add('d-none');
    if (courseName.classList.contains('is-invalid')) {
      courseName.classList.replace('is-invalid', 'is-valid');
    }
  }
  else {
    isNameVaild = false;
    nameAlert.classList.replace('d-none', 'd-block');
    courseName.classList.add('is-invalid');
  }
  checkInput();
}
/*Category start capital 
[3-20]
no numbers */
courseCategory.onkeyup = function () {
  var patern = /^[A-Z][a-z]{2,9}$/
  if (patern.test(courseCategory.value)) {
    isCategoryVaild = true;
    categoryAlert.classList.add('d-none');
    if (courseCategory.classList.contains('is-invalid')) {
      courseCategory.classList.replace('is-invalid', 'is-valid');
    }
  }
  else {
    isCategoryVaild = false;
    categoryAlert.classList.replace('d-none', 'd-block');
    courseCategory.classList.add('is-invalid');
  }
  checkInput();
}
/*Price 
[3-4]
numbers */
coursePrice.onkeyup = function () {
  var patern = /^[1-9][0-9]{2,3}$/
  if (patern.test(coursePrice.value)) {
    isPriceVaild = true;
    priceAlert.classList.add('d-none');
    if (coursePrice.classList.contains('is-invalid')) {
      coursePrice.classList.replace('is-invalid', 'is-valid');
    }
  }
  else {
    isPriceVaild = false;
    priceAlert.classList.replace('d-none', 'd-block')
    coursePrice.classList.add('is-invalid');
  }
  checkInput();
}
//  courseDescription start capital 
// [3-120]
//  numbers 
courseDescription.onkeyup = function () {
  var patern = /^[A-Z][A-Z a-z 0-9 \s]{2,120}$/
  if (patern.test(courseDescription.value)) {
    isDescriptionVaild = true;
    descriptionAlert.classList.add('d-none');
    if (courseDescription.classList.contains('is-invalid')) {
      courseDescription.classList.replace('is-invalid', 'is-valid');
    }
  }
  else {
    isDescriptionVaild = false;
    descriptionAlert.classList.replace('d-none', 'd-block');
    courseDescription.classList.add('is-invalid');
  }
  checkInput();
}
/*courseCapacity
[2-3]
numbers */
courseCapacity.onkeyup = function () {
  var patern = /^[0-9]{2,3}$/
  if (patern.test(courseCapacity.value)) {
    isCapacityVaild = true;
    capacityAlert.classList.add('d-none');
    if (courseCapacity.classList.contains('is-invalid')) {
      courseCapacity.classList.replace('is-invalid', 'is-valid');
    }
  }
  else {
    isCapacityVaild = false;
    courseCapacity.classList.add('is-invalid');
    capacityAlert.classList.replace('d-none', 'd-block');
  }
  checkInput();
}
