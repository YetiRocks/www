use yeti_core::prelude::*;

// BetaSignup: public create only (signup form)
// Visitors can submit but cannot read or delete others' signups.
resource!(TableExtender for BetaSignup {
    post => allow_create(),
});
