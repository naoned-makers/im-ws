            let cpt = 0;
            let upWay = true;
            //let moveEngine = true;
           /**
                PARTIE TOUCH
            */
           // Get a reference to our touch-sensitive element
            var touchzone = document.getElementById("touchzone");
            // Add an event handler for the touchstart event
            touchzone.addEventListener("touchstart", touchHandler, false);
            touchzone.addEventListener("touchleave", touchLeaveHandler, false);
            
            touchzone.addEventListener("mousedown", touchHandler, false);
            touchzone.addEventListener("mouseup", touchLeaveHandler, false);
            
            function touchLeaveHandler(event) {
                console.log('je suis dans touchLeaveHandler');
                //moveEngine = false;
            }
            function touchHandler(event) {
                event.preventDefault();
                
                if (event instanceof TouchEvent) {
                    console.log('youpi je suis une saucisse Touch')
                }
                if (event instanceof MouseEvent) {
                    event.stopPropagation();
                    //console.log('youpi je suis une saucisse Mouse');
                    return;
                }
                console.log(event);
                upWay = true;
                if (event.type =='mousedown') {
                    console.log('je suis dans touchHandler sans touches');
                } else if (event.touches[1]) {
                    upWay = false;
                    console.log('je suis dans touchHandler avec touches 1');
                } else if (event.touches[0]) {
                    console.log('je suis dans touchHandler avec touches 0');
                }


                
                //moveEngine = true;
                
                // Get a reference to our coordinates div
                var coords = document.getElementById("coords");
                // Write the coordinates of the touch to the div
                let status = 'status: ';
                let coordX;
                let coordY;
                if (event.type =='mousedown') {
                    coordX = event.clientX;
                    coordY = event.clientY;
                } else if (event.touches[1]) {
                    coordX = event.touches[1].pageX;
                    coordY = event.touches[1].pageY;
                } else {
                    coordX = event.touches[0].pageX;
                    coordY = event.touches[0].pageY;
                }

                if (coordX > 155 && coordX < 275 && coordY > 500 && coordY < 720) {
                    status += 'iron man lève le bras gauche';                        
                }
                if (coordX > 500 && coordX < 630 && coordY > 520 && coordY < 740) {
                    status += 'iron man lève le bras droit';                        
                }
                if (coordX > 270 && coordX < 520 && coordY > 280 && coordY < 350) {
                    status += 'iron man allume ses yeux';                        
                }
                if (coordX > 350 && coordX < 430 && coordY > 540 && coordY < 600) {
                    status = 'status: iron man allume son torse';                        
                }
                //while (moveEngine) {
                if (upWay) {
                    cpt = cpt + 1;
                } else if (event.touches[1]) {
                    cpt = cpt - 1;
                }
                    socket.emit('cpt', cpt);
                    coords.innerHTML = 'x: ' + coordX + ', y: ' + coordY + '<br/>' + status + '<br/>cpt: ' + cpt;
                //}

                //socket.emit('cpt', cpt);
            }
