class UserQuerySetMixin():

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        if user.is_authenticated:
            return super().get_queryset().filter(user=user)
        return super().get_queryset().filter(public=True)
