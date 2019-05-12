const Sidebar = `
  <div class="bg-black shadow-lg h-16 fixed pin-b mt-12 md:relative md:h-screen z-10 w-full md:w-48">

      <div class="md:w-48 md:fixed md:pin-l md:pin-t content-center md:content-start text-left justify-between">
          <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
              <router-link tag="li" class="mr-3 flex-1" to="/dashboard/staff">
                  <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-grey-darkest hover:border-pink">
                      <span class="pb-1 md:pb-0 text-xs md:text-base text-grey-dark md:text-grey-light block md:inline-block">Staff</span>
                  </a>
              </router-link>
            
          </ul>
      </div>
  </div>
    `;

export default Sidebar;
