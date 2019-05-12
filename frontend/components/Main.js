export default {
  name: "Main",
  template: `
        <div class="bg-black font-sans leading-normal tracking-normal">
        <div class="flex flex-col md:flex-row">
            <sidebar />
            <div class="main-content flex-1 bg-grey-lightest">
                <router-view></router-view>
            </div>
        </div>
        </div>
    `
};
