
var pointsArray = document.getElementsByClassName('point');

    function animatePoints(points) {
 
        Array.prototype.forEach.call( document.getElementsByClassName('point'), function(points) {
                points.style.opacity = 1;
                points.style.transform = "scaleX(1) translateY(0)";
                points.style.msTransform = "scaleX(1) translateY(0)";
                points.style.WebkitTransform = "scaleX(1) translateY(0)";
            })
        };

        window.onload = function() {
            // automatically animate the points on a tall screen where scrolling can't trigger the animation
            if (window.innerHeight > 950) {
                animatePoints(pointsArray);
            }
            var sellingPoints = document.getElementsByClassName('selling-points')[0];
            var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
            window.addEventListener('scroll', function(event) {
                if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
                    animatePoints(pointsArray);
                }
            });
        }