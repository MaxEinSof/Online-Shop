<template>
  <div :class="['loader', color]"></div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
      validator(value) {
        return ['white', 'blue'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 11em;
    height: 11em;
    border-radius: 50%;
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);

    &.white {
      background: #2c3e50;
      background: -moz-linear-gradient(left, #2c3e50 10%, rgba(#2c3e50, 0) 42%);
      background: -webkit-linear-gradient(left, #2c3e50 10%, rgba(#2c3e50, 0) 42%);
      background: -o-linear-gradient(left, #2c3e50 10%, rgba(#2c3e50, 0) 42%);
      background: -ms-linear-gradient(left, #2c3e50 10%, rgba(#2c3e50, 0) 42%);
      background: linear-gradient(to right, #2c3e50 10%, rgba(#2c3e50, 0) 42%);

      &:before {
        background: #ffffff;
      }

      &:after {
        background: #2c3e50;
      }
    }

    &.blue {
      background: #ffffff;
      background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
      background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
      background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
      background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
      background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);

      &:before {
        background: #2c3e50;
      }

      &:after {
        background: #ffffff;
      }
    }

    &:before {
      width: 50%;
      height: 50%;
      border-radius: 100% 0 0 0;
      position: absolute;
      top: 0;
      left: 0;
      content: '';
    }

    &:after {
      width: 75%;
      height: 75%;
      border-radius: 50%;
      content: '';
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
