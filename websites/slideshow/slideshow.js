function Slideshow(slide, images, delay) {
    this.slide = slide;
    this.images = images;
    this.delay = delay;
    this.currentImageIdx = 0;
}

Slideshow.prototype.changeImage = function() {
    this.slide.src = this.images[ this.currentImageIdx ];

    if (this.currentImageIdx < this.images.length - 1) {
        this.currentImageIdx++;
    } else {
        this.currentImageIdx = 0;
    }

    setTimeout(this.changeImage.bind(this), this.delay);
};

Slideshow.prototype.start = function() {
    this.changeImage.call(this);
};