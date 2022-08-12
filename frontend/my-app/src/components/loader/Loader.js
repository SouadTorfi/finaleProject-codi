import React from "react";
import "./Loader.css"

function Loader() {
  return (
    <div>
      <div class="absCenter ">
        <div class="loaderPill">
          <div class="loaderPill-anim">
            <div class="loaderPill-anim-bounce">
              <div class="loaderPill-anim-flop">
                <div class="loaderPill-pill"></div>
              </div>
            </div>
          </div>
          <div class="loaderPill-floor">
            <div class="loaderPill-floor-shadow"></div>
          </div>
       
        </div>
      </div>
    </div>
  );
}

export default Loader;
