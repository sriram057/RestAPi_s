const blogImageURL = document.getElementById("url");
const blogTitle = document.getElementById("title");
const blogDescription = document.getElementById("description");
let totalBlogs = 0;
const serverURL = "https://crudcrud.com/api/27c60dea026946dc9b4b99471e8a4eff/Blog"; // Replace with your actual API key

function handleBlogSubmit(event) {
  event.preventDefault();

  const blogDetails = {
    imageURL: blogImageURL.value,
    title: blogTitle.value,
    description: blogDescription.value,
  };

  axios.post(serverURL, blogDetails)
    .then((result) => {
      totalBlogs++;
      displayBlogsValue();
      displayBlogDetailsOnDashboard(blogDetails);

      // Clear form fields, consider visual feedback like success message
      blogImageURL.value = "";
      blogTitle.value = "";
      blogDescription.value = "";
      alert("Blog added successfully!"); // Example of visual feedback
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Failed to add blog. Please check network connectivity or API endpoint."); // Informative error message
    });
}

function displayBlogDetailsOnDashboard(blogDetails) {
  const li = document.createElement("li");
  li.className = "blogs";

  const titleElement = document.createElement("h3");
  const imageElement = document.createElement("img");
  const descriptionElement = document.createElement("p");

  titleElement.textContent = blogDetails.title;
  descriptionElement.textContent = blogDetails.description;
  imageElement.src = blogDetails.imageURL;


    li.appendChild(titleElement);
    li.appendChild(imageElement);
    li.appendChild(descriptionElement);

  const blogList = document.querySelector("#BlogList");
  blogList.appendChild(li);

  const deleteBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  editBtn.innerText = "Edit";

  li.appendChild(deleteBtn);
  const ul=document.querySelector("#BlogList");
  ul.appendChild(li);

  deleteBtn.addEventListener("click",(event) => {
    axios.delete(`${serverURL}/${blogDetails._id}`)
    .then((result) => {
        ul.removeChild(event.target.parentElement);
        totalBlogs--;
        displayBlogsValue();
    }).catch((error)=>{
        console.log("Wrong server URL",error);
        alert("deletion failed")
    })
  })



}

// Function to fetch and display blogs on page load
window.addEventListener("DOMContentLoaded", () => {
    axios.get(serverURL)
      .then((result) => {
        for (let i = 0; i < result.data.length; i++) {
          displayBlogDetailsOnDashboard(result.data[i]);
          totalBlogs++;
        }
        displayBlogsValue(); // Update total blogs displayed
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        alert("Unable to fetch blogs. Please try again later.");
      });
  });

function displayBlogsValue() {
  const totalBlogsValue = document.getElementById("totalBlogsValue");
  totalBlogsValue.innerText = totalBlogs;
}