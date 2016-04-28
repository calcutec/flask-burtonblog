define(['jquery'],
    function($){
        return function(view, options) {
            options = options || {};
            if (view.el.id == 'home-page') {
                if (this.homeView) {
                    this.homeView.close();
                }
                this.homeView = view;
                if (options.render) {
                    if (this.headerView) {
                        this.headerView.close();
                    }
                    if (this.navView) {
                        this.navView.close();
                    }
                    if (this.mainView) {
                        this.mainView.close();
                    }
                    if (this.archiveView) {
                        this.archiveView.unrender();
                        this.archiveView.close();
                    }
                    this.homeView.render();
                    $('#photo-main').html(this.homeView.el);
                }
            } else if (view.el.id == 'main-image') {
                if (this.mainView) {
                    this.mainView.close();
                }
                if (this.homeView) {
                    this.homeView.close();
                }
                this.mainView = view;
                if (options.render) {
                    if (options.entity == 'photo'){
                        if (this.archiveView) {
                            this.archiveView.unrender();
                            this.archiveView.close();
                        }
                    }
                    this.mainView.render(options);
                } else {
                    this.mainView.attachToView();               
                }
            } else if (view.el.id == 'links') {
                if (this.archiveView) {
                    this.archiveView.unrender();
                    this.archiveView.close();
                }
                this.archiveView = view;
                if (options.render) {
                    this.archiveView.render(options);
                    $('#photo-archives').html(this.archiveView.el);
                } else {
                    this.archiveView.attachToView();
                }
            } else if (view.el.id == 'header') {
                if (this.headerView) {
                    this.headerView.close();
                }
                this.headerView = view;
                if (options.render) {
                    this.headerView.render(options);
                    $('header').html(this.headerView.el);
                }
            } else if (view.el.id == 'navbar') {
                if (this.navView) {
                    this.navView.close();
                }
                this.navView = view;
                if (options.render) {
                    this.navView.render(options);
                }
            }
        };
    }
);