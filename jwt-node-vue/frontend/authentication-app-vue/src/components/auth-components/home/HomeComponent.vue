<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
    <a class="nav-link" @click="logOutUser">Log Out</a>    <a class="navbar-brand">BLOG DO JHONY</a>

        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section>

      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12">
            <ul class="list-group">
              <li class="list-group-item">Name: {{ user.name }}</li>
              <li class="list-group-item">E-mail: {{ user.email }}</li>
              <li class="list-group-item">Id: {{ user._id }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script src="./Home.js"></script>

<style src="" scoped></style>
