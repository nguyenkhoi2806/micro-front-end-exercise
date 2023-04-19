<template>
  <div class="container">
    <p>
      <i class="fa fa-times-circle-o" aria-hidden="true"></i>
      <span> Payment Failed! </span>
    </p>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  p {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e67e22;
    gap: 1rem;
    width: 70%;

    padding: 32px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 2rem;
    color: white;

    i {
      font-size: 5rem;
    }
  }
}
</style>
