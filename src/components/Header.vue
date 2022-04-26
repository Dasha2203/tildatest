<template>
  <div class="header">
    <div class="header__container">
      <Logo/>
      <Navigation/>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Logo from "@/components/Logo";

export default {
  name: "Header",
  components: {
    Logo,
    Navigation
  }
}
</script>
