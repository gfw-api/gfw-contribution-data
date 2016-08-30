'use strict';

var Router = require('koa-router');
var logger = require('logger');
var mailService = require('services/mailService');
var config = require('config');
var router = new Router({
    prefix: '/contribution-data'
});

class ContributionRouter {
    static * createStory() {
        logger.info('Sending mail');
        logger.debug('Data', this.request.body);

        let wriRecipients = config.get('wriMail.recipients').split(',');
        wriRecipients = wriRecipients.map(function(mail){
            return {
                address: mail
            };
        });
        logger.debug('Sending mail...');
        mailService.sendMail(config.get('wriMail.template'), this.request.body, wriRecipients);
        this.body = '';
    }


}

router.post('/', ContributionRouter.createStory);

module.exports = router;
