define(['jquery', 'ds'],
    function($, DS){
        return function(view) {
            if (view.el.id == 'main-view') {
                if (this.mainView) {
                    this.mainView.close();
                }
                this.mainView = view;
                if (DS.get('render')) {
                    if (DS.get('entity') == 'home' || DS.get('entity') == 'photo' || DS.get('entity') == 'upload' ){
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
                if (DS.get('render')) {
                    if (DS.get('entity') == "members") {
                        if (this.mainView) {
                            this.mainView.close();
                        }
                    }
                    this.archiveView.render();
                    $('#photo-archives').html(this.archiveView.el);
                } else {
                    this.archiveView.attachToView();
                }
            } else if (view.el.id == 'header') {
                if (this.headerView) {
                    this.headerView.close();
                }
                this.headerView = view;
                if (DS.get('render')) {
                    this.headerView.render();
                    $('header').html(this.headerView.el);
                }
            } else if (view.el.id == 'navbar') {
                if (this.navView) {
                    this.navView.close();
                }
                this.navView = view;
                if (DS.get('render')) {
                    this.navView.render();
                    $('nav').html(this.navView.el);
                }
            }
        };
    }
);