define(['jquery'],
    function($){
        return function(view, options) {
            options = options || {};
            if (view.el.id == 'main-view') {
                if (this.mainView) {
                    this.mainView.close();
                }
                this.mainView = view;
                if (options.render) {
                    if (options.entity == 'home' | options.entity == 'photo' | options.entity == 'upload' ){
                        if (this.archiveView) {
                            this.archiveView.unrender();
                            this.archiveView.close();
                        }
                    }
                    this.mainView.render();
                    $('#photo-main').html(this.mainView.el)
                }
            } else if (view.el.id == 'links') {
                if (this.archiveView) {
                    this.archiveView.unrender();
                    this.archiveView.close();
                }
                this.archiveView = view;
                if (options.render) {
                    if (options.entity == "members") {
                        if (this.mainView) {
                            this.mainView.close();
                        }
                    }
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
                    $('nav').html(this.navView.el);
                }
            }
        };
    }
);