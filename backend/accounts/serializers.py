from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Public representation of a user returned to the frontend."""

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class LoginSerializer(serializers.Serializer):
    """Validates login credentials and attaches the authenticated user."""

    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, attrs):
        user = authenticate(
            request=self.context.get('request'),
            username=attrs.get('username'),
            password=attrs.get('password'),
        )
        if user is None:
            raise serializers.ValidationError(
                'Invalid username or password.', code='authorization'
            )
        if not user.is_active:
            raise serializers.ValidationError(
                'This account has been disabled.', code='authorization'
            )
        attrs['user'] = user
        return attrs
