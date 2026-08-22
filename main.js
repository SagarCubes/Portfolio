const navbar = document.querySelector(".custom-navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});


const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const delay = entry.target.dataset.delay || 0;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    observer.observe(element);
});



/*Photos*/
const featured = [

    {
        image: "images/marine-drive.JPG",
        size: "wide",
        
    },

    
    {
        image: "images/peacock-hidden.webp",
        size: "medium",
    },
    {
        image: "images/deer-bushes.webp",
        size: "medium",
    },
    {
        image: "images/eagle-snake-bite.webp",
        size: "medium",
    },


    {
        image: "images/vistara-golden.webp",
        size: "large",
        
    },
    {
        image: "images/aix737-navi.webp",
        size: "large",
    },


    {
        image: "images/tejas-symmetry.jpg",
        size: "medium",
    },
    {
        image: "images/moon-motionblur.webp",
        size: "medium",
    },
    {
        image: "images/f35-ascent.jpg",
        size: "medium",
    },
    

    {
        image: "images/herd-of-deer.webp",
        size: "large",
    },
    {
        image: "images/ganpati-landscape.webp",
        size: "large",
    },


    {
        image: "images/emirates 777 front.webp",
        size: "medium",
    },
    {
        image: "images/bittu-mother-cafe.webp",
        size: "medium",
    },
    {
        image: "images/taj-main.webp",
        size: "medium",
    },

];

const gallery = document.getElementById("featured-gallery");

if (gallery) {

    featured.forEach(function(photo){

        gallery.innerHTML += `
            <div class="gallery-item ${photo.size}">
                <img src="${photo.image}">
            </div>
        `;

    });

};


const aero = [

    {
        image: "images/AeroIndia/su57-sideglare.webp",

    },
    {
        image: "images/AeroIndia/sarang-dive.jpg",

    },
    {
        image: "images/AeroIndia/suryakiran-portrait.jpg",
    },

    
    {
        image: "images/AeroIndia/f35-ascent.jpg",
    },
    {
        image: "images/AeroIndia/su57-ascent.webp",
    },
    {
        image: "images/AeroIndia/F35-side.webp",
    },
    {
        image: "images/AeroIndia/tejas-descentside.webp",
    },


    {
        image: "images/AeroIndia/su57-nose-open.webp",
    },
    {
        image: "images/AeroIndia/su57-afterburner.webp",
    },
    {
        image: "images/AeroIndia/f35-taxi.webp",
    },
    {
        image: "images/AeroIndia/f35-heli.webp",
    },
    {
        image: "images/tejas-symmetry.jpg",
    },
    

    {
        image: "images/AeroIndia/su57xsuryakiran.webp",
    },
    {
        image: "images/AeroIndia/suryakiran-tricolor.webp",
    },


    
    {
        image: "images/AeroIndia/suryakiran-4-formation-side.webp",
    },
    {
        image: "images/AeroIndia/suryakiran-formation.webp",
    },
    {
        image: "images/AeroIndia/sarang-headon.webp",
    },
    

    {
        image: "images/AeroIndia/sarang-side.webp",
    },
    {
        image: "images/AeroIndia/f35-afterburner.webp",
    },
    {
        image: "images/AeroIndia/su30-afterburner.webp",
    },
    {
        image: "images/AeroIndia/f35-armoury.webp",
    },
    {
        image: "images/AeroIndia/IL76-side.jpg",
    },
    {
        image: "images/AeroIndia/tejas-smoke-dive.webp",
    },
    {
        image: "images/AeroIndia/su30-takeoff.webp",
    },
    {
        image: "images/AeroIndia/sarang-under.webp",
    },

];

const aeroGallery = document.getElementById("gallery-aero");

if (aeroGallery) {

    const targetRowHeight = 760;
    const gap = 12;

    const loadedPhotos = [];

    Promise.all(
        aero.map(photo => {

            return new Promise(resolve => {

                const img = new Image();

                img.onload = function() {

                    loadedPhotos.push({
                        image: photo.image,
                        ratio: img.naturalWidth / img.naturalHeight
                    });

                    resolve();

                };

                img.src = photo.image;

            });

        })
    ).then(() => {

    function renderGallery() {
        
        // Clear the existing layout
        aeroGallery.innerHTML = "";
        
        const { targetRowHeight, gap } = getGallerySettings();

        let row = [];
        let ratioSum = 0;

        loadedPhotos.forEach(photo => {

            row.push(photo);
            ratioSum += photo.ratio;

            const availableWidth =
                aeroGallery.clientWidth -
                (row.length - 1) * gap;

            const rowHeight =
                availableWidth / ratioSum;

            if (rowHeight <= targetRowHeight) {

                createRow(row, rowHeight);

                row = [];
                ratioSum = 0;
            }
        });

        // Last row
        if (row.length > 0) {

            createRow(
                row,
                Math.min(
                    targetRowHeight,
                    (aeroGallery.clientWidth -
                        (row.length - 1) * gap) / ratioSum
                )
            );
        }
    }


    function createRow(photos, height) {

        const rowElement =
            document.createElement("div");

        rowElement.className = "gallery-row";


        photos.forEach(photo => {

            const item =
                document.createElement("div");

            item.className = "gallery-item";

            item.style.width =
                `${photo.ratio * height}px`;

            item.style.height =
                `${height}px`;

            item.innerHTML = `
                <img src="${photo.image}">
            `;

            rowElement.appendChild(item);
        });


        aeroGallery.appendChild(rowElement);
    }


    // Initial layout
    renderGallery();


    // Recalculate when browser size changes
    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            renderGallery();
        }, 150);

    });

});
}
function getGallerySettings() {
    const width = aeroGallery.clientWidth;

    if (width < 600) {
        return {
            targetRowHeight: 180,
            gap: 8
        };
    }

    if (width < 900) {
        return {
            targetRowHeight: 220,
            gap: 10
        };
    }
    else if (width > 1000) {
        return{
            targetRowHeight: 760,
            gap: 12
        }
    }

    return {
        targetRowHeight: 320,
        gap: 12
    };
}



const aviation = [

    {
        image: "images/Aviation/mi17-trees.webp",

    },
    {
        image: "images/Aviation/vistara-golden.webp",

    },
    {
        image: "images/Aviation/mi17-under.webp",
    },

    {
        image: "images/Aviation/indigo-navi.webp",
    },
    {
        image: "images/Aviation/aix737-navi.webp",
    },



    {
        image: "images/Aviation/JAL-787.WEBP",
    },
    {
        image: "images/Aviation/sing-a350-trees.jpeg",
    },
    {
        image: "images/Aviation/aka-front-navi.jpeg",
    },
    {
        image: "images/Aviation/indigo-symmetrical.WEBP",
    },



    {
        image: "images/Aviation/emirates777-tail.webp",
    },
    {
        image: "images/Aviation/emirates777-side.webp",
    },
    {
        image: "images/Aviation/emirates 777 front.webp",
    },


    {
        image: "images/Aviation/aix-symmetry.webp",
    },
    {
        image: "images/Aviation/aix-special.webp",
    },
    {
        image: "images/Aviation/AIX-night.webp",
    },


    {
        image: "images/Aviation/akasa-737-takeoff.webp",
    },
    {
        image: "images/Aviation/aka-taxi.webp",
    },
    
    {
        image: "images/Aviation/sing-a350.webp",
    },
    {
        image: "images/Aviation/atr-front.webp",
    },
    {
        image: "images/Aviation/atc-frame.webp",
    },
    {
        image: "images/Aviation/airindia-ngp-tail.webp",
    },
    {
        image: "images/Aviation/qatar-high.webp",
    },
    
];

const avGallery = document.getElementById("gallery-av");

if (avGallery) {

    const targetRowHeight = 760;
    const gap = 12;

    const loadedPhotos = [];

    Promise.all(
        aviation.map(photo => {

            return new Promise(resolve => {

                const img = new Image();

                img.onload = function() {

                    loadedPhotos.push({
                        image: photo.image,
                        ratio: img.naturalWidth / img.naturalHeight
                    });

                    resolve();

                };

                img.src = photo.image;

            });

        })
    ).then(() => {

    function renderGallery() {
        
        // Clear the existing layout
        avGallery.innerHTML = "";
        
        const { targetRowHeight, gap } = getAVGallerySettings();

        let row = [];
        let ratioSum = 0;

        loadedPhotos.forEach(photo => {

            row.push(photo);
            ratioSum += photo.ratio;

            const availableWidth =
                avGallery.clientWidth -
                (row.length - 1) * gap;

            const rowHeight =
                availableWidth / ratioSum;

            if (rowHeight <= targetRowHeight) {

                createRow(row, rowHeight);

                row = [];
                ratioSum = 0;
            }
        });

        // Last row
        if (row.length > 0) {

            createRow(
                row,
                Math.min(
                    targetRowHeight,
                    (avGallery.clientWidth -
                        (row.length - 1) * gap) / ratioSum
                )
            );
        }
    }


    function createRow(photos, height) {

        const rowElement =
            document.createElement("div");

        rowElement.className = "gallery-row";


        photos.forEach(photo => {

            const item =
                document.createElement("div");

            item.className = "gallery-item";

            item.style.width =
                `${photo.ratio * height}px`;

            item.style.height =
                `${height}px`;

            item.innerHTML = `
                <img src="${photo.image}">
            `;

            rowElement.appendChild(item);
        });


        avGallery.appendChild(rowElement);
    }


    // Initial layout
    renderGallery();


    // Recalculate when browser size changes
    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            renderGallery();
        }, 150);

    });

});
}
function getAVGallerySettings() {
    const width = avGallery.clientWidth;

    if (width < 600) {
        return {
            targetRowHeight: 180,
            gap: 8
        };
    }

    if (width < 900) {
        return {
            targetRowHeight: 220,
            gap: 10
        };
    }
    else if (width > 1000) {
        return{
            targetRowHeight: 760,
            gap: 12
        }
    }

    return {
        targetRowHeight: 320,
        gap: 12
    };
}



const travel = [

    {
        image: "images/Travel/chikmagalur-woods.webp",

    },
    {
        image: "images/Travel/marine-drive.webp",

    },
    {
        image: "images/Travel/dal-lake.webp",
    },

    {
        image: "images/Travel/odyssey.webp",
    },
    
    {
        image: "images/Travel/ganpati-landscape.webp",
    },
    {
        image: "images/Travel/aarti.webp",
    },
    {
        image: "images/Travel/mahalakshmi.webp",
    },
    {
        image: "images/Travel/ganpati-potrait.webp",
    },
    {
        image: "images/Travel/ganpati-eyes.webp",
    },
    {
        image: "images/Travel/navi-airport.webp"
    },
    {
        image: "images/Travel/plane-window-wingtip.webp"
    },
    {
        image: "images/Travel/taj-main.webp",
    },
    {
        image: "images/Travel/chikmagalur-mountain.webp",
    },
    {
        image: "images/Travel/taj-quarter.webp",
    },
    {
        image: "images/Travel/alandi-temple.webp",
    },
    {
        image: "images/Travel/farm-fog-pole.webp",
    },
    {
        image: "images/Travel/sonmarg-landscape.webp",
    },
    
    {
        image: "images/Travel/sonmarg-mountain.webp",
    },
    {
        image: "images/Travel/sand-beach-footsteps.webp",
    },
    {
        image: "images/Travel/taj-balcony.webp",
    },
    {
        image: "images/Travel/sonmarg-black-forest.webp",
    },
    {
        image: "images/Travel/rameshwaram-lighthouse.webp",
    },
    {
        image: "images/Travel/tuljapur-temple.webp",
    },
    {
        image: "images/Travel/phone-golden.webp",
    },
    {
        image: "images/Travel/mist-woods.webp",
    },
    {
        image: "images/Travel/low-top-temple-detail.webp",
    },
    {
        image: "images/Travel/indiagate.webp",
    },
    {
        image: "images/Travel/benz-golden.webp",
    },
    {
        image: "images/Travel/temple-under-construction.webp"
    },
    {
        image: "images/Travel/taj-2.webp"
    },
    {
        image: "images/Travel/temple-chandelier.webp"
    },
    {
        image: "images/Travel/plane-trees.webp"
    },
    {
        image: "images/Travel/me-river-alandi.webp"
    },
    {
        image: "images/Travel/me-forest.webp"
    },

];

const travelGallery = document.getElementById("gallery-travel");

if (travelGallery) {

    const targetRowHeight = 760;
    const gap = 12;

    const loadedPhotos = [];

    Promise.all(
        travel.map(photo => {

            return new Promise(resolve => {

                const img = new Image();

                img.onload = function() {

                    loadedPhotos.push({
                        image: photo.image,
                        ratio: img.naturalWidth / img.naturalHeight
                    });

                    resolve();

                };

                img.src = photo.image;

            });

        })
    ).then(() => {

    function renderGallery() {
        
        // Clear the existing layout
        travelGallery.innerHTML = "";
        
        const { targetRowHeight, gap } = getTravelGallerySettings();

        let row = [];
        let ratioSum = 0;

        loadedPhotos.forEach(photo => {

            row.push(photo);
            ratioSum += photo.ratio;

            const availableWidth =
                travelGallery.clientWidth -
                (row.length - 1) * gap;

            const rowHeight =
                availableWidth / ratioSum;

            if (rowHeight <= targetRowHeight) {

                createRow(row, rowHeight);

                row = [];
                ratioSum = 0;
            }
        });

        // Last row
        if (row.length > 0) {

            createRow(
                row,
                Math.min(
                    targetRowHeight,
                    (travelGallery.clientWidth -
                        (row.length - 1) * gap) / ratioSum
                )
            );
        }
    }


    function createRow(photos, height) {

        const rowElement =
            document.createElement("div");

        rowElement.className = "gallery-row";


        photos.forEach(photo => {

            const item =
                document.createElement("div");

            item.className = "gallery-item";

            item.style.width =
                `${photo.ratio * height}px`;

            item.style.height =
                `${height}px`;

            item.innerHTML = `
                <img src="${photo.image}">
            `;

            rowElement.appendChild(item);
        });


        travelGallery.appendChild(rowElement);
    }


    // Initial layout
    renderGallery();


    // Recalculate when browser size changes
    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            renderGallery();
        }, 150);

    });

});
}
function getTravelGallerySettings() {
    const width = travelGallery.clientWidth;

    if (width < 600) {
        return {
            targetRowHeight: 180,
            gap: 8
        };
    }

    if (width < 900) {
        return {
            targetRowHeight: 220,
            gap: 10
        };
    }
    else if (width > 1000) {
        return{
            targetRowHeight: 760,
            gap: 12
        }
    }

    return {
        targetRowHeight: 320,
        gap: 12
    };
}








const wild = [

    {
        image: "images/Wildlife/leopard-side-front.webp",

    },
    {
        image: "images/Wildlife/leopard-side.webp",

    },

    {
        image: "images/Wildlife/eagle-snake-bite.webp",
    },
    {
        image: "images/Wildlife/dog-skeleton.webp",
    },
    {
        image: "images/Wildlife/eagle-branch.webp",
    },
    {
        image: "images/Wildlife/woodpecker-branch.webp"
    },

    {
        image: "images/Wildlife/deer-chase.webp"
    },
    
    {
        image: "images/Wildlife/deer-bushes.webp"
    },
    {
        image: "images/Wildlife/herd-of-deer.webp"
    },
    {
        image: "images/Wildlife/langur-tree.webp"
    },
    {
        image: "images/Wildlife/flameback-woodpecker.webp"
    },
    {
        image: "images/Wildlife/elephant-individual-far.webp"
    },
    
    {
        image: "images/Wildlife/smolbird-wire.webp"
    },
    {
        image: "images/Wildlife/bird-perched-tree.jpg"
    },
    {
        image: "images/Wildlife/bird-railing.webp"
    },
    {
        image: "images/Wildlife/group-elephant.webp"
    },
    {
        image: "images/Wildlife/parrot-midflight.webp"
    },
    {
        image: "images/Wildlife/peacock-majestic.webp"
    },
    {
        image: "images/Wildlife/bulbul-wire.webp"
    },
];

const wildGallery = document.getElementById("gallery-wild");

if (wildGallery) {

    const targetRowHeight = 760;
    const gap = 12;

    const loadedPhotos = [];

    Promise.all(
        wild.map(photo => {

            return new Promise(resolve => {

                const img = new Image();

                img.onload = function() {

                    loadedPhotos.push({
                        image: photo.image,
                        ratio: img.naturalWidth / img.naturalHeight
                    });

                    resolve();

                };

                img.src = photo.image;

            });

        })
    ).then(() => {

    function renderGallery() {
        
        // Clear the existing layout
        wildGallery.innerHTML = "";
        
        const { targetRowHeight, gap } = getWildGallerySettings();

        let row = [];
        let ratioSum = 0;

        loadedPhotos.forEach(photo => {

            row.push(photo);
            ratioSum += photo.ratio;

            const availableWidth =
                wildGallery.clientWidth -
                (row.length - 1) * gap;

            const rowHeight =
                availableWidth / ratioSum;

            if (rowHeight <= targetRowHeight) {

                createRow(row, rowHeight);

                row = [];
                ratioSum = 0;
            }
        });

        // Last row
        if (row.length > 0) {

            createRow(
                row,
                Math.min(
                    targetRowHeight,
                    (wildGallery.clientWidth -
                        (row.length - 1) * gap) / ratioSum
                )
            );
        }
    }


    function createRow(photos, height) {

        const rowElement =
            document.createElement("div");

        rowElement.className = "gallery-row";


        photos.forEach(photo => {

            const item =
                document.createElement("div");

            item.className = "gallery-item";

            item.style.width =
                `${photo.ratio * height}px`;

            item.style.height =
                `${height}px`;

            item.innerHTML = `
                <img src="${photo.image}">
            `;

            rowElement.appendChild(item);
        });


       wildGallery.appendChild(rowElement);
    }


    // Initial layout
    renderGallery();


    // Recalculate when browser size changes
    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            renderGallery();
        }, 150);

    });

});
}
function getWildGallerySettings() {
    const width = wildGallery.clientWidth;

    if (width < 600) {
        return {
            targetRowHeight: 180,
            gap: 8
        };
    }

    if (width < 900) {
        return {
            targetRowHeight: 220,
            gap: 10
        };
    }
    else if (width > 1000) {
        return{
            targetRowHeight: 780,
            gap: 12
        }
    }

    return {
        targetRowHeight: 320,
        gap: 12
    };
}







const potraits = [

    {
        image: "images/Portraits/bittu-sitting.webp",
    },
    {
        image: "images/Portraits/bittu-mother.webp",
    },
    {
        image: "images/Portraits/forbes-type.webp",
    },
    {
        image: "images/Portraits/bittu-isntrumental.webp",
    },
    {
        image: "images/Portraits/bittu-friend.webp",
    },
    {
        image: "images/Portraits/bittu-mother-cafe.webp",
    },
    {
        image: "images/Portraits/woman-sitting.webp",
    },
    {
        image: "images/Portraits/mummy-navratri.webp",
    },
    {
        image: "images/Portraits/woman-cafe.webp",
    },
    {
        image: "images/Portraits/lala-balcony.webp",
    },
    {
        image: "images/Portraits/lala-laidback.webp",
    },
    {
        image: "images/Portraits/bittu-crowd.webp",
    },
    {
        image: "images/Portraits/mummy-side.webp",
    },
    {
        image: "images/Portraits/me-mirror-phulaamla.webp",
    },
];

const potraitGallery = document.getElementById("gallery-ptr");

if (potraitGallery) {

    const targetRowHeight = 760;
    const gap = 12;

    const loadedPhotos = [];

    Promise.all(
        potraits.map(photo => {

            return new Promise(resolve => {

                const img = new Image();

                img.onload = function() {

                    loadedPhotos.push({
                        image: photo.image,
                        ratio: img.naturalWidth / img.naturalHeight
                    });

                    resolve();

                };

                img.src = photo.image;

            });

        })
    ).then(() => {

    function renderGallery() {
        
        // Clear the existing layout
        potraitGallery.innerHTML = "";
        
        const { targetRowHeight, gap } = getPtrGallerySettings();

        let row = [];
        let ratioSum = 0;

        loadedPhotos.forEach(photo => {

            row.push(photo);
            ratioSum += photo.ratio;

            const availableWidth =
                potraitGallery.clientWidth -
                (row.length - 1) * gap;

            const rowHeight =
                availableWidth / ratioSum;

            if (rowHeight <= targetRowHeight) {

                createRow(row, rowHeight);

                row = [];
                ratioSum = 0;
            }
        });

        // Last row
        if (row.length > 0) {

            createRow(
                row,
                Math.min(
                    targetRowHeight,
                    (potraitGallery.clientWidth -
                        (row.length - 1) * gap) / ratioSum
                )
            );
        }
    }


    function createRow(photos, height) {

        const rowElement =
            document.createElement("div");

        rowElement.className = "gallery-row";


        photos.forEach(photo => {

            const item =
                document.createElement("div");

            item.className = "gallery-item";

            item.style.width =
                `${photo.ratio * height}px`;

            item.style.height =
                `${height}px`;

            item.innerHTML = `
                <img src="${photo.image}">
            `;

            rowElement.appendChild(item);
        });


       potraitGallery.appendChild(rowElement);
    }


    // Initial layout
    renderGallery();


    // Recalculate when browser size changes
    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {
            renderGallery();
        }, 150);

    });

});
}
function getPtrGallerySettings() {
    const width = potraitGallery.clientWidth;

    if (width < 600) {
        return {
            targetRowHeight: 400,
            gap: 8
        };
    }

    if (width < 900) {
        return {
            targetRowHeight: 360,
            gap: 10
        };
    }
    else if (width > 1000) {
        return{
            targetRowHeight: 780,
            gap: 12
        }
    }

    return {
        targetRowHeight: 320,
        gap: 12
    };
}





/*--------lightbox------------*/


const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button
        class="lightbox-close"
        aria-label="Close image"
        type="button"
    >
        &times;
    </button>

    <img
        class="lightbox-image"
        alt=""
    >
`;

document.body.appendChild(lightbox);


const lightboxImage =
    lightbox.querySelector(".lightbox-image");

const lightboxClose =
    lightbox.querySelector(".lightbox-close");



/* ---------------- OPEN ---------------- */

document.addEventListener("click", function(event) {

    const image =
        event.target.closest(".gallery-item img");

    if (!image) return;


    lightboxImage.src =
        image.currentSrc || image.src;

    lightboxImage.alt =
        image.alt || "";


    lightbox.classList.add("active");

    // Prevent page scrolling behind the lightbox
    document.body.style.overflow = "hidden";

});



/* ---------------- CLOSE FUNCTION ---------------- */

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}



/* ---------------- CLOSE BUTTON ---------------- */

lightboxClose.addEventListener(
    "click",
    closeLightbox
);



/* ---------------- CLICK OUTSIDE IMAGE ---------------- */

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});



/* ---------------- ESCAPE KEY ---------------- */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeLightbox();
    }

});