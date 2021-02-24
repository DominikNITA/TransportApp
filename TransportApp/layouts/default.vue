<template>
  <v-app class="min-h-screen flex flex-col">
    <Header />
    <TitleBar/>
    <div class="main flex flex-col flex-grow bg-gray-200 justify-center">
      <Nuxt />
    </div>
    <Footer />
  </v-app>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  --highlight-color: #f6ad55;
  --main-color: #4a5568;
  --central-part-width: 58rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.central-part{
  max-width: var(--central-part-width);
}
.side-part{
  width: calc((100% - var(--central-part-width))/2);
  min-width: 20px;
}

.highlight-text{
  color: var(--highlight-color)
}

.main-bg{
  background-color: var(--main-color);
}
</style>
