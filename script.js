document.addEventListener("DOMContentLoaded", function () {
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  var loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      var message = document.getElementById("loginMessage");
        var savedUsername = localStorage.getItem("blogUsername");
        var savedPassword = localStorage.getItem("blogPassword");

        if ((username === "artist" && password === "sketch") ||
          (username === savedUsername && password === savedPassword)) {
        message.textContent = "Login successful!";
        message.style.color = "green";
        setTimeout(function () {
          window.location.href = "index.html";
        }, 800);
      } else {
        message.textContent = "Incorrect username or password.";
        message.style.color = "red";
      }
    });
  }

  var signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var username = document.getElementById("newUsername").value;
      var password = document.getElementById("newPassword").value;
      var confirmPassword = document.getElementById("confirmPassword").value;
      var message = document.getElementById("signupMessage");

      if (password !== confirmPassword) {
        message.textContent = "The passwords do not match.";
        message.style.color = "red";
      } else {
        localStorage.setItem("blogUsername", username);
        localStorage.setItem("blogPassword", password);
        message.textContent = "Account created! You can now log in.";
        message.style.color = "green";
        signupForm.reset();
      }
    });
  }

  var showFormBtn = document.getElementById("showFormBtn");
  var postForm = document.getElementById("postForm");
  if (showFormBtn && postForm) {
    showFormBtn.addEventListener("click", function () {
      postForm.classList.toggle("hidden");
    });
  }

  var postsList = document.getElementById("postsList");
  var postFormSubmit = document.getElementById("postForm");
  if (postFormSubmit && postsList) {
    postFormSubmit.addEventListener("submit", function (event) {
      event.preventDefault();

      var title = document.getElementById("postTitle").value;
      var text = document.getElementById("postText").value;
      var imageFile = document.getElementById("postImage").files[0];

      if (title && text) {
        var imageData = "";

        function addPostToPage(imageSource) {
          var newPost = document.createElement("div");
          newPost.className = "post";
          var imageHtml = imageSource ? '<img src="' + imageSource + '" alt="' + title + '" />' : "";
          newPost.innerHTML = imageHtml + "<h3>" + title + "</h3><p>" + text + "</p>";

          postsList.insertBefore(newPost, postsList.firstChild);
          postFormSubmit.reset();
          postFormSubmit.classList.add("hidden");

          var posts = JSON.parse(localStorage.getItem("drawingPosts") || "[]");
          posts.unshift({ title: title, text: text, image: imageSource });
          localStorage.setItem("drawingPosts", JSON.stringify(posts));
        }

        if (imageFile) {
          var reader = new FileReader();
          reader.onload = function (e) {
            addPostToPage(e.target.result);
          };
          reader.readAsDataURL(imageFile);
        } else {
          addPostToPage("");
        }
      }
    });
  }

  if (postsList) {
    var savedPosts = JSON.parse(localStorage.getItem("drawingPosts") || "[]");
    for (var i = 0; i < savedPosts.length; i++) {
      var savedPost = document.createElement("div");
      savedPost.className = "post";
      var savedImage = savedPosts[i].image ? '<img src="' + savedPosts[i].image + '" alt="' + savedPosts[i].title + '" />' : "";
      savedPost.innerHTML = savedImage + "<h3>" + savedPosts[i].title + "</h3><p>" + savedPosts[i].text + "</p>";
      postsList.insertBefore(savedPost, postsList.firstChild);
    }
  }
});
