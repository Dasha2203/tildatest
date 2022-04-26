<template>
  <div class="header">
    <div class="header__container">
      <Navigation/>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "Header",
  components: {
    Navigation
  }
}
</script>
