class UserQuerySetMixin():
    """
    Mixin to filter queryset based on the user's authentication status.
    """

    def get_queryset(self, *args, **kwargs):
        """
        Get the queryset filtered based on the user's authentication status.
        If the user is authenticated, filter by the user; otherwise, filter by public items.
        """
        user = self.request.user
        if user.is_authenticated:
            return super().get_queryset().filter(user=user)
        return super().get_queryset().filter(public=True)
